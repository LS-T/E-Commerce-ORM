const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// GET all tags include product through productTag as tag_id
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include:[{ model: Product, as:'tag_id'}],
    });
    
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// GET a single tag by its id
router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include:[{ model: Product, as:'tag_id'}],
    });
    if(!tagData){
      res.status(404).json({ message: 'No tag found with this ID!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new tag 
router.post('/', async (req, res) => {
  try{
    const newTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a tag by its id
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
     const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id:req.params.id,
        },
      }
    )
  res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by its id 
router.delete('/:id', async (req, res) => {
  try{
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deleteTag) {
      res.status(400).json({ message: 'No tag found by this ID!'});
      return;
    }
    res.status(200).json(deleteTag);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
