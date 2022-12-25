const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);



// userSchema.methods.Save = async (data) => {
//     let model=new User(data)
//     await model.save();
// }

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password)
// }

// userSchema.pre('save', function (next) {
//     if (this.password) {
//           bcrypt.hash(this.password, bcrypt.genSaltSync(15), (err, hash) => {
//               if (err) console.log(err);
//               this.password = hash;
//               next();
//           });
//       }
//     }) 

const User = mongoose.model('User', userSchema)

module.exports = User 