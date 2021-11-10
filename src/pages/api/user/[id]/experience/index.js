import dbConnect from '../../../../../utils/dbConnect'
import ExperienceModel from '../../../../../models/experience'

// Request handler function
export default async function handler(req, res) {

  // Connect to database or reuse previous connection
  await dbConnect()

  // Handle request methods
  switch (req.method) {

      // Get all experiences from a single user from the database
      case 'GET':
        try {
          console.log('tried getting expereinces')
          const allExperience = await ExperienceModel.find({userid: `${req.query.id}`})
          res.json(allExperience)
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
        break;

      // Create an experience for an user and post it to the database
      case 'POST':
        const experience = new ExperienceModel({
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          skills: req.body.skills
        })
    
        try {
          console.log('tried saving')
          const newExperience = await experience.save()
          console.log('success')
          res.status(201).json(newExperience)
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
        break;

      // case 'PUT':
      //   try {
      //     const experience = await ExperienceModel.findOneAndUpdate({ user_id: req.query.id }, req.body, {
      //         new: true
      //     })
      //     res.json(experience)
      // } catch (err) {
      //     res.status(500).json({ message: err.message })
      // }
      // break;

      // Method not implemented
      default:
        res.status(501).json({ message: 'Request method not implemented' })
  }
}