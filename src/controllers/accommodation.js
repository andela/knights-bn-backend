import { config } from 'dotenv';
import models from '../db/models';

config();
export default class accomodationFacility {
  static async getAllAccommodations(req, res) {
    try {
      const accommodations = await models.Accommodation.findAll();
      return res.status(200).json({ status: 200, data: accommodations });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }

  static async getSingleAccommodation(req, res) {
    const accommodationId = req.params.id;
    const singleAccommodation = await models.Accommodation
      .findOne({ where: { id: accommodationId } });
    if (singleAccommodation === null) {
      return res.status(404)
        .json({ status: 404, errorMessage: 'accommmodation not found' });
    }
    return res.status(200).json({ status: 200, data: singleAccommodation });
  }

  static async editAccommodation(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400)
          .json({ status: 400, errorMessage: 'You are sending with empty fields' });
      }
      await models.Accommodation
        .update(req.body, { where: { id: req.params.id, userId: req.user.id } });
      return res.status(200).json({ status: 200, data: req.accommodation });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async uploadBuildingImage(req, res) {
    try {
      if (typeof req.file === 'undefined') {
        return res.status(400)
          .json({ status: 400, errorMessage: 'You forget to chose image' });
      }
      req.body.imageOfBuilding = `${process.env.HOST_NAME}/${req.file.url}`;
      return res.status(200).json({ status: 200, message: 'image uploaded successfully' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async createAccomodation(req, res) {
    try {
      req.body.imageOfBuilding = (typeof req.file === 'undefined') ? 'image'
        : `${process.env.HOST_NAME}/${req.file.url}`;
      req.body.userId = req.user.id;
      const accommodation = await models.Accommodation.create(req.body);
      return res.status(201).json({ status: 200, data: accommodation });
    } catch (error) {
      return res.status(500).json({ status: 500, errorMessage: error });
    }
  }
}

