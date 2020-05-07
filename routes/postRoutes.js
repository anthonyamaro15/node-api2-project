const express = require("express");
const db = require("../data/db");

const route = express.Router();

// GET /api/posts
// route.get("/", (req, res) => {
//   db.find().then(posts => {
//      res.status(200).json(posts);
//   }).catch(err => {
//      res.status(500).json({errorMessage: ''})
//   })
// });

// POST /api/posts
route.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    db.insert(req.body)
      .then((posts) => {
        res.status(201).json(posts);
      })
      .catch((err) => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database",
        });
      });
  }
});

// POST /api/posts/:id/comments
route.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findById(id).then((post) => {
    if (!post.length) {
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist.",
      });
    } else {
      if (!req.body.text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text fro the comment" });
      } else {
        db.insertComment(req.body)
          .then((comment) => {
            res.status(201).json(comment);
          })
          .catch((err) => {
            res.status(500).json({
              errorMessage:
                "There was an error while saving the comment to the database",
            });
          });
      }
    }
  });
});

// GET /api/posts
route.get("/", (req, res) => {
  db.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET /api/posts/:id
route.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((post) => {
      if (!post.length) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "The post information could not be retrieved." });
    });
});

// GET /api/posts/:id/comments
route.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((comment) => {
      if (!comment.length) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(comment);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The comments information could not be retrieved.",
      });
    });
});

// DELETE /api/posts/:id
route.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id).then((post) => {
    if (!post.length) {
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist.",
      });
    } else {
      db.remove(id)
        .then((post) => {
          res.status(200).json(post);
        })
        .catch((err) => {
          res.status(500).json({ errorMessage: "The post could not removed" });
        });
    }
  });
});

// PUT /api/posts/:id
route.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;
  db.findById(id).then((post) => {
    if (!post.length) {
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist.",
      });
    } else {
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        db.update(id, req.body)
          .then((post) => {
            res.status(200).json(post);
          })
          .catch((err) => {
            res.status(500).json({
              errorMessage: "The post information could not be modified.",
            });
          });
      }
    }
  });
});

module.exports = route;
