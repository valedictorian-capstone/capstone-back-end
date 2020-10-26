import { FeedBack } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { FeedBackUM, FeedBackVM } from "@view-models";

export class FeedBackMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(FeedBack, FeedBackVM);
        mapper.createMap(FeedBackUM, FeedBackVM);
      }
}