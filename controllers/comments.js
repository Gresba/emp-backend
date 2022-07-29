import Comment from "../models/comment.js"

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

export const getComment = async (req, res) => {
  try {
    const params = req.params;

    const id = params.id;

    const comment = await Comment.findById(id)

    if (comment)
      return res.json(comment)

    res.status(404).json({ message: "Comment not found" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

export const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body)

    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

export const updateComment = async (req, res) => {
  try {
    const params = req.params;

    const id = params.id;

    const comment = await Comment.findByIdAndUpdate(id, req.body);

    if (comment)
      return res.json(comment)

    res.status(404).json({ error: "Comment Not Found" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

export const deleteComment = async (req, res) => {
  try {
    const params = req.params;

    const id = params.id;

    const comment = await Comment.findByIdAndDelete(id);

    if (comment)
      return res.send("Successfully deleted comment")

    res.status(404).json({ error: "Could not find" })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
