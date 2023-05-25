const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category = await Category.findByPk(req.params.id)
  await category.update({category_name:req.body.category_name})
  await res.json(category)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const category = await Category.findByPk(req.params.id)
    await category.destroy()
    await res.status(200).json({"message": `${category.category_name} category deleted`})
    } catch(err){
      res.status(500).json(err)
    }
});

module.exports = router;
