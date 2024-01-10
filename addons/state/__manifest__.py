{
    'name': "Inmobiliaria",
    'version': '1.0',
    'depends': ['base'],
    'author': "Christian Guaman",
    'description': """
    Módulo de inmobiliaria
    """,
    'application': True,
    'data': [
        'security/ir.model.access.csv',
        'views/estate_property_views.xml',
        'views/estate_property_type_views.xml',
        'views/estate_menus.xml',
    ],
    'license': 'AGPL-3'
}