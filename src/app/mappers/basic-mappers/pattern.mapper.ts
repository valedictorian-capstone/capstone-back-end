import { Pattern } from "@models";
import { FormControlVM } from "@view-models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "nestjsx-automapper";
import { PatternUM, PatternVM } from "src/app/view-models/basic-view-models/pattern.view-model";

export class PatternMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Pattern, PatternVM)
            .forMember(d => d.formControls,
                preCondition((s) => s.formControls != null, []),
                mapWith(FormControlVM, s => s.formControls)
            );
        mapper.createMap(PatternUM, PatternVM);
    }
}