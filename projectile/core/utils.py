from enum import Enum

class ChoiceEnum(Enum):
    @classmethod
    def choices(cls):
        return ((tag.value, tag.name.title()) for tag in cls)
