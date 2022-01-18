"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tought = require('../models/Tought');

var User = require('../models/User');

var _require = require('sequelize'),
    Op = _require.Op;

module.exports =
/*#__PURE__*/
function () {
  function ToughtController() {
    _classCallCheck(this, ToughtController);
  }

  _createClass(ToughtController, null, [{
    key: "showAll",
    value: function showAll(req, res) {
      var search, order, toughtsData, toughts, toughtQty, userId, logado, likeid, datalike, tought;
      return regeneratorRuntime.async(function showAll$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              search = "";

              if (req.query.search) {
                search = req.query.search;
              }

              order = 'DESC';

              if (req.query.order === 'old') {
                order = 'ASC';
              } else {
                order = 'DESC';
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(Tought.findAll({
                include: User,
                where: {
                  title: _defineProperty({}, Op.like, "%".concat(search, "%"))
                },
                order: [['createdAt', order]]
              }));

            case 6:
              toughtsData = _context.sent;
              toughts = toughtsData.map(function (result) {
                return result.get({
                  plain: true
                });
              });
              toughtQty = toughts.length;
              userId = req.session.userid;
              logado = true;

              if (toughtQty === 0) {
                toughtQty = false;
              }

              if (!userId) {
                logado = false;
              }

              likeid = "";

              if (!req.query.like) {
                _context.next = 22;
                break;
              }

              likeid = req.query.like;
              _context.next = 18;
              return regeneratorRuntime.awrap(Tought.findOne({
                raw: true,
                where: {
                  id: likeid
                }
              }));

            case 18:
              datalike = _context.sent;
              tought = {
                title: datalike.title,
                like: datalike.like + 1
              };
              _context.next = 22;
              return regeneratorRuntime.awrap(Tought.update(tought, {
                where: {
                  id: likeid
                }
              }));

            case 22:
              res.render('Toughts/home', {
                toughts: toughts,
                search: search,
                toughtQty: toughtQty,
                logado: logado
              });

            case 23:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "dashboard",
    value: function dashboard(req, res) {
      var user, toughts, emptyToughts;
      return regeneratorRuntime.async(function dashboard$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(User.findOne({
                where: {
                  id: req.session.userid
                },
                include: Tought,
                plain: true
              }));

            case 2:
              user = _context2.sent;

              if (user) {
                _context2.next = 6;
                break;
              }

              res.redirect('/login');
              return _context2.abrupt("return");

            case 6:
              toughts = user.Toughts.map(function (result) {
                return result.dataValues;
              });
              emptyToughts = false;

              if (toughts.length === 0) {
                emptyToughts = true;
              }

              res.render('Toughts/dashboard', {
                toughts: toughts,
                emptyToughts: emptyToughts
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "createToughts",
    value: function createToughts(req, res) {
      res.render('Toughts/create');
    }
  }, {
    key: "createToughtsSave",
    value: function createToughtsSave(req, res) {
      var tought, dados;
      return regeneratorRuntime.async(function createToughtsSave$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              tought = {
                title: req.body.title,
                UserId: req.session.userid
              };
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(Tought.create(tought));

            case 4:
              _context3.next = 6;
              return regeneratorRuntime.awrap(Tought.findOne({
                raw: true,
                where: {
                  Userid: req.session.userid
                }
              }));

            case 6:
              dados = _context3.sent;
              req.flash('message', 'Pensamento criado com sucesso');
              req.session.save(function () {
                res.redirect('/toughts/dashboard');
              });
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 11]]);
    }
  }, {
    key: "removeTought",
    value: function removeTought(req, res) {
      var id;
      return regeneratorRuntime.async(function removeTought$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.body.id;
              _context4.next = 3;
              return regeneratorRuntime.awrap(Tought.destroy({
                where: {
                  id: id,
                  UserId: req.session.userid
                }
              }));

            case 3:
              req.flash('message', 'Pensamento deletado com sucesso');
              req.session.save(function () {
                res.redirect('/toughts/dashboard');
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "updatedTought",
    value: function updatedTought(req, res) {
      var id, tought;
      return regeneratorRuntime.async(function updatedTought$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.id;
              _context5.next = 3;
              return regeneratorRuntime.awrap(Tought.findOne({
                raw: true,
                where: {
                  id: id,
                  Userid: req.session.userid
                }
              }));

            case 3:
              tought = _context5.sent;
              res.render('toughts/edit', {
                tought: tought
              });

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "updatedToughtSave",
    value: function updatedToughtSave(req, res) {
      var id, tought;
      return regeneratorRuntime.async(function updatedToughtSave$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = req.body.id;
              tought = {
                title: req.body.title
              };
              _context6.next = 4;
              return regeneratorRuntime.awrap(Tought.update(tought, {
                where: {
                  id: id
                }
              }));

            case 4:
              req.flash('message', 'Pensamento Alterado com sucesso');
              req.session.save(function () {
                res.redirect('/toughts/dashboard');
              });

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }]);

  return ToughtController;
}();