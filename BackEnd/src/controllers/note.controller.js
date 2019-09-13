const Note = require("../models/Notes");

const noteCtrl = {};

noteCtrl.getNotes = async (req, res) => {
  let notes = await Note.find();
  res.json(notes);
};

noteCtrl.getNote = async (req, res) => {
    let id = req.params.id;
    let note = await Note.findById(id);
    res.json(note);
};

noteCtrl.createNotes = async (req, res) => {
  let { tittle, content, author } = req.body;
  let newNote = new Note({
    tittle: tittle,
    content: content,
    author: author
  });

  await newNote.save();

  res.json({
    Message: "Note created succesfully"
  });
};

noteCtrl.updateNotes = async (req, res) => {
    let { tittle, content, author } = req.body;

    let id = req.params.id;
    let note = await Note.findOneAndUpdate({_id: id}, {
        tittle,
        content,
        author
    });
    res.json({
        'message': 'Note updated'
    });
};

noteCtrl.deleteNotes = async (req, res) => {
    let id = req.params.id;
    await Note.findByIdAndRemove(id);
    res.json({
        'message': 'Note deleted'
    });
};

module.exports = noteCtrl;
