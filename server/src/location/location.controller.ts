import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private locationServices: LocationService){}
    @Get("all")
    getAllLocations(){
        return this.locationServices.getAllLocations();
    }
}
