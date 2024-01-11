from odoo import models, fields

class PropertyTag(models.Model):
    _name = "estate_property_tag"
    _description = "Real Estate Property Tag Model"

    name = fields.Char(required=True, string="Tag de propiedad")
    color = fields.Integer(string="Color")

    _order = 'name asc'