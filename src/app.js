const mongoose = require('mongoose');
const validator = require('validator');
//connecting mongoose with Database .. existing database?copy that path: Will create a new database with given name
mongoose
  .connect('mongodb://localhost:27017/ttchannel')
  .then(() => {
    console.log('connection is successfully established');
  })
  .catch((err) => {
    console.log(err);
  });

//Schema --> A Mongoose schema  defines the structure of the document, default values, validators.

//soting the schema inside a instance variable
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: [2, 'minimum allowed length is 2'],
  },
  ctype: {
    type: String,
    enum: ['frontend', 'backend', 'database'],
    lowercase: true,
  },
  videos: Number,
  author: String,
  email: {
    type: String,
    required: true,
    unique: true,
    //validator will take the user's email input
    validate(value) {
      //we have many pre-build methods inside validator to check the validations
      if (!validator.isEmail(value)) {
        throw new Error('Oops, invalid Email Address!');
      }
    },
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating the model and storing it inside a class || COLLECTION CREATION
//Models are defined by passing a Schema instance to mongoose.model.
//it is class tha's why const Playlist
////
//collection name
const Playlist = new mongoose.model('Playlist', playlistSchema);
////

//
//In the above line I am giving the model name as Playlist(singular form with first capital letter) but my mongo will convert Playlist to playlists (in plural form with small capital letter)
//note: model name should be singular

//create or insert document ->  with teh help of collection named as 'Playlist'

//using async await

//LOGIC TO INSERT ONE DOCUMENT
/*
const createDocument = async () => {
  try {
    const reactPlaylist = await new Playlist({
      name: 'Node JS',
      ctype: 'Back End',
      videos: 9,
      author: 'Ajay',
      active: true,
    });

    //To save the data inside database -->  reactPlaylist.save()
    //but we want to display the result also hence storing the sending data inside a variable result.
    //.save() return a promise --> to deal with it , we are using async await logic
    const result = await reactPlaylist.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
*/

//LOGIC TO INSERT MULTIPLE DOCUMENT AT A TIME
/*
const createDocument = async () => {
  try {
    const expressPlaylist = await new Playlist({
      name: 'express JS',
      ctype: 'Back End',
      videos: 96,
      author: 'Ajay',
      active: true,
    });
    const javascriptPlaylist = await new Playlist({
      name: 'JS',
      ctype: 'Front End',
      videos: 94,
      author: 'Ajay',
      active: true,
    });
    const mongoPlaylist = await new Playlist({
      name: 'Mongo',
      ctype: 'database',
      videos: 91,
      author: 'Ajay',
      active: true,
    });
    const chartPlaylist = await new Playlist({
      name: 'chart.js',
      ctype: 'library',
      videos: 99,
      author: 'Ajay',
      active: true,
    });
    const sqlPlaylist = await new Playlist({
      name: 'sql',
      ctype: 'database',
      videos: 9,
      author: 'Ajay',
      active: true,
    });

    //To save the multiple data at a time  inside database -->  use array and insertMany() which belongs to mongo.
    //but we want to display the result also hence storing the sending data inside a variable result.
    const result = await Playlist.insertMany([
      sqlPlaylist,
      chartPlaylist,
      mongoPlaylist,
      javascriptPlaylist,
      expressPlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

*/

//LOGIC TO READ DOCUMENT using async await because it will return me a promise
/*
const getDocument = async () => {
  try{
//to get all data
  // const result = await Playlist.find();
  //to get specific data
  // const result = await Playlist.find({ ctype: 'Front End' });
  //filtering the specified data inside a document
  // const result = await Playlist.find({ ctype: 'Front End' }).select({
  //   name: 1,
  // });
  //to get only few data out of many existing data with same name
  const result = await Playlist.find({ ctype: 'Front End' }).limit(2);
  console.log(result);
};
  }catch(err)=>{console.log(err)}
  
getDocument();
*/

//TOPIC --> comparison query Operator in mongo db
/*
const getDocument = async () => {
  try {
    //   for >    $gt
    // const result = await Playlist.find({ videos: { $gt: 90 } });

    //    for >=  $gte

    //const result = await Playlist.find({ videos: { $gte: 9 } });

    //similary < lt , <= lte

    // to get the matched data from array $in
    //  const result = await Playlist.find({
    //   ctype: { $in: ['Back End', 'database'] },
    // });

    //to get the unmatched data from array $nin
  
    const result = await Playlist.find({
      ctype: { $nin: ['database', 'Back End'] },
    });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
getDocument();
*/

//TOPIC --> LOGICAL QUERY OPERATORS
//types--> $and ,  $or ,  $not , $nor
/*
const getDocument = async () => {
  try {
    // using $or operator in mongodb --> performs operation on an array of two or more

    // const result = await Playlist.find({
    //   $or: [{ ctype: 'Front End' }, { videos: 99 }],
    // });

    // $and operator
    // const result = await Playlist.find({
    //   $and: [{ ctype: 'Front End' }, { videos: 99 }],
    // });

    //$nor operator
    const result = await Playlist.find({
      $or: [{ ctype: 'Front End' }, { videos: 99 }],
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getDocument();
*/

//TOPIC --> QUERY --> count,sort
// const getDocument = async () => {
//   try {
//querying countDocuments()
// const result = await Playlist.find({
//   $or: [{ ctype: 'Front End' }, { videos: 99 }],
// }).countDocuments();

//sort() --> this will return you the data as it is stored inside database
// const result = await Playlist.find().sort();

//sorting in Ascending order...to set value to true use 1
// const result = await Playlist.find().sort({ name: 1 }).select({ name: 1 });

//sorting in Descending order ... to set value use -1
//     const result = await Playlist.find().sort({ name: -1 }).select({ name: 1 });
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// getDocument();

//TOPIC ---> UPDATING VALUES INSIDE MOGOdb
// const getDocument = async (id) => {
//   try {
//     //method -01 to update -->  it will match the database document's id with the given id . if it is true update it
//     const result = await Playlist.updateOne(
//       { _id: id },
//       { $set: { name: 'Express JS' } }
//     );
//method 02 this method will give you update information like which has has been been updated
//     const result = await Playlist.findByIdAndUpdate(
//       { _id: id },
//       { $set: { videos: 69 } },
//       { new: true }
//     );
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// getDocument('644a209793db30cb5f98cc57');

//TOPIC --> DELETE
// const deleteDocument = async (_id) => {
//   try {
//method -01 to delete using matched given id with database 's document  _id
// const result = await Playlist.deleteOne({ _id: _id });

//method -02 this will give you the all details like which id has been deleted
//     const result = await Playlist.findByIdAndDelete({ _id: _id });
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// deleteDocument('644a659cb8ed76f0b450c1bd');

//CUSTOM VALIDATION
const createDocument = async () => {
  try {
    //setting name-->uppercase->true: this will convert the names into uppercase before storing the data
    //similarly, lowercase->true
    // const uppercasePlaylist = await new Playlist({
    //   name: 'qspider',
    //   ctype: 'Training',
    //   videos: 102,
    //   author: 'Ajay_m',
    //   active: true,
    // });
    //setting name-->trim->true : this will remove the extra spaces
    // const trimPlaylist = await new Playlist({
    //   name: '   python     ',
    //   ctype: 'backend',
    //   videos: 300,
    //   author: 'Ajay_m',
    //   active: true,
    // });

    //IMPORTANT CUSTOM VALIDATION
    //setting ctype:{enum:true} -> Array,creates a validators that checks if the value is in the given array or not
    const enumPlaylist = await new Playlist({
      name: ' c++    ',
      ctype: 'backend',
      videos: 201,
      author: 'Ajay_m',
      email: 'abcd@gmail.com',
      active: true,
    });

    //To save the multiple data at a time  inside database -->  use array and insertMany() which belongs to mongo.
    //but we want to display the result also hence storing the sending data inside a variable result.
    const result = await Playlist.insertMany([enumPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
