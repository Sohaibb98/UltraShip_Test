const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: String,
        allowNull: false,
      },
      password: {
        type: String,
        allowNull: false,
      }
}, {
    timestamps: true
});

module.exports = model('User', userSchema);