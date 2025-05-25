import DataPenerbit from "../models/dataPenerbitModel.js"

// GET (Mengambil Data)
async function getDataPenerbit(req, res){
    try {

        const result = await DataPenerbit.findAll()
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
    }
    
}
// GET by ID
async function getDataPenerbitById(req, res) {
    try {
      const response = await DataPenerbit.findAll({
        where: {
          id_penerbit: req.params.id_penerbit,
        }
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  
 
// POST
async function createDataPenerbit(req, res) {
    try {
      console.log("User login:", req.user.username);
      
      const inputResult = req.body;
      const newDataPenerbit = await DataPenerbit.create(inputResult);
      res.status(201).json(newDataPenerbit);
    } catch (error) {
      console.log(error.message)
    }
  }
  
  // PUT/PATCH
  async function updateDataPenerbit(req, res) {
    try {
      const {id} = req.params;
      const updateInput = req.body;
      const dataPenerbit = await DataPenerbit.findByPk(id);
  
      if (!dataPenerbit){
        return res.status(404).json({message: "Data Penerbit not found"});
      }
  
      await DataPenerbit.update(updateInput, { where: {id} });
      res.status(200).json({message: "Data Penerbit update successfully"});
    } catch (error) {
      console.log(error.message)
    }
  }
  // DELETE
  async function deleteDataPenerbit(req, res){
    try {
      const {id} = req.params;
      const dataPenerbit = await DataPenerbit.findByPk(id);
  
      if (!dataPenerbit){
        return res.status(404).json({message: "Data Penerbit not found"});
      }
  
      await DataPenerbit.destroy({ where: {id} });
      res.status(200).json({message: "Data Penerbit deleted successfully"});
    } catch (error) {
      console.log(error.message)
    }
  }

export {getDataPenerbit, getDataPenerbitById, createDataPenerbit, updateDataPenerbit, deleteDataPenerbit};