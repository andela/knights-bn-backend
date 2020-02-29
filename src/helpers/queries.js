class accommodationQueries {
  static async getAccommodation(_attr, value, entity) {
    let accommodation;
    switch (_attr) {
      case 'id':
        accommodation = await entity.findOne({
          where: { id: value },
        });
        break;
      default:
        accommodation = null;
        break;
    }
    return accommodation;
  }

  static async getAOne(_attr1, _attr2, value1, value2, entity) {
    const result = await entity.findOne({ where: { _attr1: value1, _attr2: value2 } });
    return result;
  }
}

export default accommodationQueries;

