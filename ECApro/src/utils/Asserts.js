const Asserts = {};

Asserts.notNull = (field,message)=>{
  if (field == undefined || field == null) {
    throw new Error(message);
  }
};

Asserts.notEmpty = (field,message)=>{
  Asserts.notNull(field,message);
  if (field == "") {
    throw new Error(message);
  }
};

Asserts.isHigherThanZero = (field,message)=>{
  if (field  <= 0) {
    throw new Error(message);
  }
};

export default Asserts;
