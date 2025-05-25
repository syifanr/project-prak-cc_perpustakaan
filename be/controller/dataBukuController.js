import DataBuku from "../models/dataBukuModel.js"

// GET (Mengambil Data)
async function getDataBuku(req, res){
    try {

        const result = await DataBuku.findAll()
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
    }
    
}
// GET by ID
async function getDataBukuById(req, res) {
    try {
      const response = await DataBuku.findAll({
        where: {
          id_buku: req.params.id_buku,
        }
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  
 
// POST
async function createDataBuku(req, res) {
    try {
      const inputResult = req.body;
      const newDataBuku = await DataBuku.create(inputResult);
      res.status(201).json(newDataBuku);
    } catch (error) {
      console.log(error.message)
    }
  }
  
  // PUT/PATCH
  async function updateDataBuku(req, res) {
    try {
      const {id} = req.params;
      const updateInput = req.body;
      const dataBuku = await DataBuku.findByPk(id);
  
      if (!dataBuku){
        return res.status(404).json({message: "Data Buku not found"});
      }
  
      await DataBuku.update(updateInput, { where: {id} });
      res.status(200).json({message: "Data Buku update successfully"});
    } catch (error) {
      console.log(error.message)
    }
  }
  // DELETE
  async function deleteDataBuku(req, res){
    try {
      const {id} = req.params;
      const dataBuku = await DataBuku.findByPk(id);
  
      if (!dataBuku){
        return res.status(404).json({message: "Data Buku not found"});
      }
  
      await DataBuku.destroy({ where: {id} });
      res.status(200).json({message: "Data Buku deleted successfully"});
    } catch (error) {
      console.log(error.message)
    }
  }

export {getDataBuku, getDataBukuById, createDataBuku, updateDataBuku, deleteDataBuku};