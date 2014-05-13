import mongoengine as me

class XPath(me.Document):

    str = me.StringField()
    clicks = me.IntField(min_value=0, default=0)

class Position(me.Document):

    x = me.DecimalField(precision=5)
    y = me.DecimalField(precision=5)
    xpath = me.ReferenceField(XPath)
