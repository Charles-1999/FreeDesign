const koa2Req = require('koa2-request');

// const fxp = require('fast-xml-parser');

const httpRequest = async (address) => {
  // const addr = encodeURI(address)
  const url = 'http://localhost:2222/wx/api/ship/getShipFee';
  var options = {
    method: 'post',
    url: url,
    json: {
      shop_no: '11047059',
      origin_id: 'o_111',
      city: '深圳',
      cargo_price: '10.00',
      is_prepay: '1',
      receiver_name: '张三',
      receiver_address: '深圳市南山区南山大道时代骄子大厦',
      receiver_phone: '13760264461',
      source_id: '73753',
      ship_type_id: 3
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  const res = await koa2Req(options);
  return res.body.data;
};

module.exports = {
  httpRequest
};
