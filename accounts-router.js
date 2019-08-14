const express = require("express");

const Accounts = require("./data/accountModel.js");

const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
    const newAccount = req.body;

    if (newAccount.name && newAccount.budget) {
        try {
            const post = await Accounts.insert(req.body);
            res.status(201).json(post);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message:
                    "There was an error while saving the account to the database"
            });
        }
    } else {
        res.status(400).json({
            err: "Please provide name and budget for the account."
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const accounts = await Accounts.get();
        res.status(200).json(accounts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "The account information could not be retrieved."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const account = await Accounts.getById(req.params.id);

        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({
                message: "The account with the specified ID does not exist"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The account information could not be retrieved"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const account = await Accounts.remove(req.params.id);

        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({
                message: "The account with the specified ID does not exist."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The account could not be removed."
        });
    }
});

router.put("/:id", async (req, res) => {
    const updatedAccount = req.body;

    if (updatedAccount.name && updatedAccount.budget) {
        try {
            const account = await Accounts.update(req.params.id, req.body);
            res.status(200).json(account);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "The account information could not be modified."
            });
        }
    } else {
        res.status(400).json({
            err: "Please provide name and budget for the account."
        });
    }
});
