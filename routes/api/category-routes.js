const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories include product_name from Product model 
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include:[{ model: Product, attribute: ['product_name']}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a product by its id 
router.get('/:id', async (req, res) => {
  try{
    const singularCategory = await Category.findByPk(req.params.id, {
      include:[{ model: Product, attributes:['product_name']}],
    });
    if(!singularCategory) {
      res.status(404).json({ message: 'No category found with this ID!'});
      return;
    }
    res.status(200).json(singularCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new category 
router.post('/', async (req, res) => {
  try{
    const newCategoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// UPDATE a category by its id
router.put('/:id', async (req, res) => {
  try{
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id:req.params.id,
        },
      }
    )
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by its id 
router.delete('/:id', async (req, res) => {
  try{
    const deleteCategory = await Category.destroy({
      where: {
        id:req.params.id,
      }
    });
    if(!deleteCategory) {
      res.status(400).json({ message: 'No category found by this id!'});
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
