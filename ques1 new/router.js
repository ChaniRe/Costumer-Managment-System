import{Router} from 'express';
import express from 'express';
import Friend from './models/friend.js';
const app = express();

const router = Router();
app.use(express.json());


// get all friends
router.get('/friends', async (req, res) => {
  try {
      const friends = await Friend.find({});
      res.status(200).json(friends);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching friends from database');
  }
});


// get one friend
router.get('/friends/:id', async (req, res) => {
  try {
    const friend = await Friend.findById(req.params.id);
    if (!friend) {
      return res.status(404).send('Friend not found');
    }
    res.status(200).json(friend);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching friend from database');
  }
});

// create one
router.post('/friends', async (req, res) => {
  try {
      const newFriend = new Friend(req.body);
      await newFriend.save();
      res.status(201).send('Friend added successfully!');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error adding friend to database');
  }
});

// update friend
router.put('/friends/:id', async (req, res) => {
  try {
      const updatedFriend = await Friend.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
      );
      res.status(200).send('Friend updated successfully!');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error updating friend in database');
  }
});


// delete friend
router.delete('/friends/:id', async (req, res) => {

  try {
      await Friend.findByIdAndDelete(req.params.id);
      res.status(200).send('Friend deleted successfully!');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting friend from database');
  }
});


export default router;
