from odoo import models, fields
from datetime import datetime, timedelta

class EstateProperty(models.Model):
    _name = "estate_property"
    _description = "Real Estate Property Model" 

    name = fields.Char(required=True, string="Título")
    description = fields.Text(string="Descripción")
    postcode = fields.Char(string="Código Postal")
    date_availability = fields.Date(copy=False, default=fields.Date.today() + timedelta(weeks=12), string="Disponible desde")
    expected_price = fields.Float(required=True, string="Precio estimado")
    selling_price = fields.Float(readonly=True, copy=False, string="Precio de venta")
    bedrooms = fields.Integer(default=2, string="Habitaciones")
    living_area = fields.Integer(string="Superficie")
    facades = fields.Integer(string="Fachadas")
    garage = fields.Boolean(string="Garaje")
    garden = fields.Boolean(string="Jardín")
    garden_area = fields.Integer(string="Superficie del jardín")
    garden_orientation = fields.Selection([
        ('north', 'North'),
        ('south', 'South'),
        ('east', 'East'),
        ('west', 'West'),
    ], string="Orientación del jardín")
    active = fields.Boolean(default=False, string="Activo")
    state = fields.Selection([
        ('new', 'New'),
        ('offer_received', 'Offer Received'),
        ('offer_accepted', 'Offer Accepted'),
        ('sold', 'Sold'),
        ('canceled', 'Canceled'),
    ], default='new', required=True, string="Estado")
    property_type_id = fields.Many2one('estate_property_type', string="Tipo de propiedad")
    property_tag_ids = fields.Many2many('estate_property_tag', string="Etiquetas")
    user_id = fields.Many2one('res.users', string="Vendendor", default=lambda self: self.env.user)
    buyer_id = fields.Many2one('res.partner', string="Comprador")