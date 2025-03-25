from ...lib.schemas import APISchema


class GetIsHealthyResponse(APISchema):
    is_healthy: bool
