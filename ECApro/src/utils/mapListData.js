function mapListData(data,model){
  let datos = [];
      data.map(stated => {
        console.log(stated);
        datos.push(new model(stated));
      });
  return datos;
}

export{
  mapListData
}
