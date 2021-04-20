const Thing = require("../models/thing");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.sauce);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      // invalid sauce:id
      res.status(404).json({
        error: "Cette sauce n'existe pas",
      });
    });
};

exports.modifyThing = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;

  try {
    const checkSauce = await Thing.findOne({
      _id: req.params.id,
    });
    req.body.likes = checkSauce.likes;

    if (checkSauce) {
      if (userId === checkSauce.userId) {
        const thingObject = req.file
          ? (Thing.findOne({
              _id: req.params.id,
            }).then((sauce) => {
              const filename = sauce.imageUrl.split("/images/")[1];
              fs.unlinkSync(`images/${filename}`);
            }),
            {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            })
          : { ...req.body };
        const runValidSauce = {
          runValidators: true, // fait run sauceVerif dans la modification
        };
        Thing.updateOne(
          { _id: req.params.id },
          { ...thingObject, _id: req.params.id },
          runValidSauce
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) =>
            res
              .status(400)
              .json({ error: "erreur la sauce n'a pas pu être modifié" })
          );
      } else {
        res.status(400).json({ error: "Cette sauce ne vous appartient pas" });
      }
    } else {
      res.status(400).json({ error: "Cette sauce n'éxiste pas" });
    }
  } catch (error) {
    res.status(400).json({ error: "Cette sauce n'éxiste pas" });
  }

  /*const thingObject = req.file
    ? {
        ...JSON.parse(req.body.sauce), // modifier l'image de la sauce
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  const runValidSauce = {
    runValidators: true, // fait run sauceVerif dans la modification
  };
  Thing.updateOne(
    { _id: req.params.id },
    { ...thingObject, _id: req.params.id },
    runValidSauce
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) =>
      res.status(400).json({ error: "La sauce n'a pas été modifié" })
    );*/
};

exports.deleteThing = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.userId;

  try {
    const checkSauce = await Thing.findOne({
      _id: req.params.id,
    });
    req.body.likes = checkSauce.likes;

    if (checkSauce) {
      if (userId === checkSauce.userId) {
        Thing.findOne({ _id: req.params.id })
          .then((thing) => {
            const filename = thing.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              Thing.deleteOne({ _id: req.params.id })
                .then(() =>
                  res.status(200).json({ message: "Objet supprimé !" })
                )
                .catch((error) => res.status(400).json({ error }));
            });
          })
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(400).json({ error: "Cette sauce ne vous appartient pas" });
      }
    } else {
      res.status(400).json({ error: "Cette sauce n'éxiste pas" });
    }
  } catch (error) {
    res.status(400).json({ error: "Cette sauce n'éxiste pas" });
  }
};

exports.getAllSauces = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likeDislike = (req, res, next) => {
  // Ajout/suppression d'un like et dislike à une sauce
  // Like présent dans le body
  let like = req.body.like;
  // On prend le userID
  let userId = req.body.userId;
  // On prend l'id de la sauce
  let sauceId = req.params.id;

  if (like === 1) {
    // Si il s'agit d'un like
    Thing.updateOne(
      {
        _id: sauceId,
      },
      {
        // On push l'utilisateur et on incrémente le compteur de 1
        $push: {
          usersLiked: userId,
        },
        $inc: {
          likes: +1,
        }, // On incrémente de 1
      }
    )
      .then(() =>
        res.status(200).json({
          message: "j'aime ajouté !",
        })
      )
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }
  if (like === -1) {
    Thing.updateOne(
      // S'il s'agit d'un dislike
      {
        _id: sauceId,
      },
      {
        $push: {
          usersDisliked: userId,
        },
        $inc: {
          dislikes: +1,
        }, // On incrémente de 1
      }
    )
      .then(() => {
        res.status(200).json({
          message: "Dislike ajouté !",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }
  if (like === 0) {
    // Si il s'agit d'annuler un like ou un dislike
    Thing.findOne({
      _id: sauceId,
    })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {
          // Si il s'agit d'annuler un like
          Thing.updateOne(
            {
              _id: sauceId,
            },
            {
              $pull: {
                usersLiked: userId,
              },
              $inc: {
                likes: -1,
              }, // On incrémente de -1
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Like retiré !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }
        if (sauce.usersDisliked.includes(userId)) {
          // Si il s'agit d'annuler un dislike
          Thing.updateOne(
            {
              _id: sauceId,
            },
            {
              $pull: {
                usersDisliked: userId,
              },
              $inc: {
                dislikes: -1,
              }, // On incrémente de -1
            }
          )
            .then(() =>
              res.status(200).json({
                message: "Dislike retiré !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }
      })
      .catch((error) =>
        res.status(404).json({
          error,
        })
      );
  }
};
