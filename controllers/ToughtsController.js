const Tought = require('../models/Tought')
const User = require('../models/User');

const { Op } = require('sequelize')


module.exports = class ToughtController {
    static async showAll(req, res) {

        let search = ``

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },
            order: [
                ['createdAt', order]
            ]
        })

        const toughts = toughtsData.map(result => result.get({ plain: true }));
        let toughtQty = toughts.length;

        const userId = req.session.userid;
        let logado = true;

        if (toughtQty === 0) {
            toughtQty = false
        }

        if (!userId) {
            logado = false;
        }

        let likeid = ``

        if (req.query.like) {
            likeid = req.query.like;

            const datalike = await Tought.findOne({ raw: true, where: { id: likeid } })

            const tought = {
                title: datalike.title,
                like: datalike.like + 1
            }

            await Tought.update(tought, { where: { id: likeid } })
        }



        res.render('Toughts/home', { toughts, search, toughtQty, logado })
    }

    static async dashboard(req, res) {
        const user = await User.findOne({ where: { id: req.session.userid }, include: Tought, plain: true, })

        if (!user) {
            res.redirect('/login')
            return
        }

        const toughts = user.Toughts.map(result => result.dataValues)

        let emptyToughts = false
        if (toughts.length === 0) {
            emptyToughts = true

        }

        res.render('Toughts/dashboard', { toughts, emptyToughts })
    }

    static createToughts(req, res) {
        res.render('Toughts/create')

    }

    static async createToughtsSave(req, res) {

        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Tought.create(tought)
            const dados = await Tought.findOne({ raw: true, where: { Userid: req.session.userid } })

            req.flash('message', 'Pensamento criado com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }

    }

    static async removeTought(req, res) {
        const id = req.body.id

        await Tought.destroy({ where: { id: id, UserId: req.session.userid } })

        req.flash('message', 'Pensamento deletado com sucesso')

        req.session.save(() => {
            res.redirect('/toughts/dashboard')
        })

    }

    static async updatedTought(req, res) {
        const id = req.params.id;

        const tought = await Tought.findOne({ raw: true, where: { id: id, Userid: req.session.userid } })
        res.render('toughts/edit', { tought })
    }

    static async updatedToughtSave(req, res) {

        const id = req.body.id;

        const tought = {
            title: req.body.title
        }

        await Tought.update(tought, { where: { id: id } })

        req.flash('message', 'Pensamento Alterado com sucesso')

        req.session.save(() => {
            res.redirect('/toughts/dashboard')
        })

    }
}