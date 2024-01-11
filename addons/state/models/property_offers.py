from odoo import models, fields

class PropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Real Estate Property Offers Model"

    price = fields.Float(required=True, string="Precio")
    status = fields.Selection([
        ('accepted', 'Accepted'),
        ('refused', 'Refused'),
    ], default='accepted', required=True, string="Estado", copy=False)
    partner_id = fields.Many2one('res.partner', string="Comprador", required=True)
    property_id = fields.Many2one('estate_property', string="Propiedad", required=True)