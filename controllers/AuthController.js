const User = require('../models/User')

const bcrypt = require('bcryptjs');
const Tought = require('../models/Tought');

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {

        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            req.flash('message', 'Usuario não encontrado')
            res.render('auth/login')

            return
        }

        // check if passwords match
        const passwordMath = bcrypt.compareSync(password, user.password)

        if (!passwordMath) {
            req.flash('message', 'Senha invalida')
            res.render('auth/login')

            return
        }

        // initialize session
        req.session.userid = user.id;

        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })

    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {

        const { name, email, password, confirmpassword } = req.body;
        //password math validation
        if (password != confirmpassword) {
            //mensagem
            req.flash('message', 'As senhas não conferem, tentem novamente!')
            res.render('auth/register')

            return
        }

        //check if user exists
        const CheckIfUserExists = await User.findOne({ where: { email: email } })


        if (CheckIfUserExists) {
            req.flash('message', 'O email já esta em uso!')
            res.render('auth/register')

            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            // initialize session
            req.session.userid = createdUser.id;

            req.session.save(() => {
                res.redirect('/')
            })

        } catch (err) {
            console.log(err)
        }

    }

    static async logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

}