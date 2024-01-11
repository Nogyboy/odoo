from odoo import models, fields

class PropertyType(models.Model):
    _name = "estate_property_type"
    _description = "Real Estate Property Type Model"

    name = fields.Char(required=True, string="Tipo de propiedad")

    _sql_constraints = [
        ('name', 'unique(name)', 'El tipo de propiedad ya existe.'),
    ]