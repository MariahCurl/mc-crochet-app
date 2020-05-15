const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Project = sequelize.import('../models/projects')
const validateSession = require('../middleware/validate-session')

// Create
router.post('/create' , validateSession , (req, res) => {
    const projectRequest = {
        projectName: req.body.projectName,
        projectDescription: req.body.projectDescription,
        yarn: req.body.yarn,
        hookSize: req.body.hookSize,
        owner: req.user.id
    }
    Project.create(projectRequest)
    .then(projects => res.status(200).json(projects))
        .catch(err => res.json(req.error))
})

// Get All
router.get('/', (req,res) => {
    Project.findAll()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({error: err}))
})

// Update
router.put('/projects/:id', validateSession, (req, res) => {
    Log.update(req.body.log, {
        where: { 
          id: req.params.id, 
          owner: req.user.id
        }, 
        returning:true 
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
  });

//   GET
router.get('/project/:id', validateSession, (req, res) => {
    Log.findOne({ 
      where: { 
        id: req.params.id, 
        owner: req.user.id
      }
    })
      .then(log => res.status(200).json(log))
      .catch(err => res.status(500).json({ error: err }))
  });
  
//   delete
router.delete("/delete/:id", validateSession, (req, res) => {
    Log.destroy({where: { 
      id: req.params.id, 
      owner: req.user.id
    },
    returning: true 
  })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
  });

module.exports = router;