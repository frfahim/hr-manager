from core.utils  import ChoiceEnum

class RequestStatus(ChoiceEnum):
    OPEN = 1
    REVIEWED = 2
    PROCESSED = 3
