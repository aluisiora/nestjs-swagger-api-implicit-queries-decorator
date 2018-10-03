import { SwaggerEnumType } from "@nestjs/swagger/dist/types/swagger-enum.type";
import { createMultipleParamDecorator } from "@nestjs/swagger/dist/decorators/helpers";
import { isNil } from "lodash";

const initialMetadata = {
    name: "",
    required: true,
};

export const ApiImplicitQueries = (metadata: {
    name: string;
    description?: string;
    required?: boolean;
    type?: "String" | "Number" | "Boolean" | any;
    isArray?: boolean;
    enum?: SwaggerEnumType;
    collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" | "multi";
}[]): MethodDecorator => {
    const params = [];

    for (const md of metadata) {
        const param = {
            name: isNil(md.name) ? initialMetadata.name : md.name,
            in: "query",
            description: md.description,
            required: md.required,
            type: md.type,
            enum: undefined,
            items: undefined,
            collectionFormat: undefined,
        };

        if (md.enum) {
            param.type = String;
            param.enum = md.enum;
        }

        if (md.isArray) {
            param.type = Array;
            if (md.enum) {
                param.items = {
                    type: "String",
                    enum: md.enum,
                };
                param.collectionFormat = "multi";
                param.enum = undefined;
            } else {
                param.items = {
                    type: md.type,
                };
                param.collectionFormat = isNil(md.collectionFormat)
                    ? "csv"
                    : md.collectionFormat;
            }
        }

        params.push(param);
    }

    return createMultipleParamDecorator(params, initialMetadata);
};