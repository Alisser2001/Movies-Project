import { Controller, Get } from '@nestjs/common';
import { CharacterService } from "./character.service";

@Controller('character')
export class CharacterController {
    constructor(private charServices: CharacterService){}
    @Get("all")
    getAllCharacters(){
        return this.charServices.getAllCharacters();
    }
}
