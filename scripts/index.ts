import * as fs from 'fs';
import * as path from 'path';
import { execa } from 'execa';

async function runPrettier(app: 'api' | 'models') {
  try {
    let pathname = '';

    switch (app) {
      case 'api':
        pathname = '../apps/api';
        break;
      case 'models':
        pathname = '../packages/models';
        break;
      default:
        console.error('Error: Invalid app name');
        process.exit(1);
    }
    // Run Prettier only in the "pathname" directory
    await execa('pnpm', [`--filter=${app}`, 'format', '--write', '.'], {
      cwd: path.resolve(__dirname, pathname), // Set the current working directory to packages/models
    });
    console.log(`Prettier ran successfully for ${pathname}`);
  } catch (error) {
    console.error('Error running Prettier:', error);
    process.exit(1);
  }
}

/**
 * @function
 * @description Gets the base path for the folder.
 * @param {string} componentName - The name of the component.
 * @param {"Api" | "Packages"} folder - The folder to create.
 * @returns {string} The base path for the folder.
 * @since 1.0.0
 * @summary Gets the base path for the folder.
 * @version 1
 */

function getBasePath(componentName: string, folder: 'Api' | 'Packages') {
  // Define the base path for the folder

  switch (folder) {
    case 'Api':
      const apiBasePath = path.resolve(
        __dirname,
        '../apps/api/src/components',
        componentName
      );
      if (fs.existsSync(apiBasePath)) {
        console.error(`Error: Folder '${componentName}' already exists.`);
        return '';
      }
      return apiBasePath;
    case 'Packages':
      const basePath = path.resolve(
        __dirname,
        '../packages/models/src',
        componentName
      );
      if (fs.existsSync(basePath)) {
        console.error(`Error: Folder '${componentName}' already exists.`);
        return '';
      }
      return basePath;
    default:
      return '';
  }
}

/**
 * @async
 * @function
 * @description Creates the packages folder and files for the project.
 * @param {string} componentName - The name of the component.
 * @returns {void}
 * @since 1.0.0
 * @summary Generate the packages folder and files for the project.
 * @version 1
 */

function generatePackageComponent(_componentName: string) {
  const componentName = _componentName.toLowerCase();
  const capitalized =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const basePath = getBasePath(componentName, 'Packages');

  // Create the folder
  fs.mkdirSync(basePath);

  // #region create files

  // create the index.ts file
  const indexPath = path.resolve(basePath, 'index.ts');
  const indexContent = `export * from './${componentName}.dto';
  export * from './${componentName}.schema';`;

  fs.writeFileSync(indexPath, indexContent.trim());

  // Create the Dto file
  const dtoPath = path.resolve(basePath, `${componentName}.dto.ts`);
  const dtoContent = `
  import { basicModelDefinition, objectIdString } from '../basicDefinitions';
  import { z } from 'zod';

  export const ${componentName.toLowerCase()}Definition = basicModelDefinition.extend({});
  
  export const create${capitalized}Input = ${componentName.toLowerCase()}Definition.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
  });

  export type TCreate${capitalized}Input = z.infer<typeof create${capitalized}Input>;

  // Pagination

  export const filter${capitalized}Input = ${componentName.toLowerCase()}Definition.partial().optional();

  export type TFilter${capitalized}Input = z.infer<typeof filter${capitalized}Input>;

  // Find one

  export const findOne${capitalized}Input = ${componentName.toLowerCase()}Definition.pick({
    _id: true,
  });

  export type TFindOne${capitalized}Input = z.infer<typeof findOne${capitalized}Input>;

  export const update${capitalized}Input = ${componentName.toLowerCase()}Definition.pick({
    _id: true,
  });

  export type TUpdate${capitalized}Input = z.infer<typeof update${capitalized}Input>;
  `;

  fs.writeFileSync(dtoPath, dtoContent.trim());

  // Create the Schema file

  const schemaPath = path.resolve(basePath, `${componentName}.schema.ts`);
  const schemaContent = `
  import type { z } from 'zod';
  import { ${componentName.toLowerCase()}Definition } from './${componentName}.dto';
  import { Document, type Types, Schema } from 'mongoose';

  export type I${capitalized} = z.infer<typeof ${componentName.toLowerCase()}Definition>;

  export type ${capitalized}Document = I${capitalized} & Document<Types.ObjectId, object, I${capitalized}>;

  export const ${componentName.toLowerCase()}Schema = new Schema<I${capitalized}>(
    {},
    { timestamps: true }
  );
  `;
  fs.writeFileSync(schemaPath, schemaContent.trim());

  // update the index.ts file
  const newLine = `\nexport * from './${componentName}'`;

  const srcIndexPath = path.resolve(
    __dirname,
    '../packages/models/src/index.ts'
  );

  fs.appendFileSync(srcIndexPath, newLine);
  // #endregion
}

/**
 * @async
 * @function
 * @description Creates the Api folder and files for the project.
 * @param {string} componentName - The name of the component.
 * @returns {void}
 * @since 1.0.0
 * @summary Generate the Api folder and files for the project.
 * @version 1
 */

function generateApiComponent(_componentName: string) {
  const componentName = _componentName.toLowerCase();
  const capitalized =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const apiBasePath = getBasePath(componentName, 'Api');

  // Create the folder
  fs.mkdirSync(apiBasePath);

  // create the schema folder
  const schemaPath = path.resolve(apiBasePath, 'schema');
  fs.mkdirSync(schemaPath);

  // create the index file
  const schemaIndexPath = path.resolve(schemaPath, 'index.ts');
  const schemaIndexContent = `import { models, MongooseModels } from '../../../core/models';
  
  export const ${capitalized}Schemas: MongooseModels = models.filter(
    (model) =>
      model.name === '${capitalized}' ||
      model.name === 'Store' ||
      model.name === 'User' ||
      model.name === 'Role',
  );
  `;

  fs.writeFileSync(schemaIndexPath, schemaIndexContent.trim());

  // create the model file

  const modelPath = path.resolve(schemaPath, `${componentName}.model.ts`);
  const modelContent = `import { zodToClass } from '../../../lib/zod-to-schema';
  import { Type } from 'class-transformer';
  import { create${capitalized}Input } from '@packages/models';
  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

  @Schema({
    timestamps: true,
  })
  export class ${capitalized} extends zodToClass(create${capitalized}Input) {
  }

  export const ${capitalized}Schema = SchemaFactory.createForClass(${capitalized});
  `;

  fs.writeFileSync(modelPath, modelContent.trim());

  // Create the index file

  const componentIndexPath = path.resolve(apiBasePath, 'index.ts');
  const componentIndexContent = `export * from './${componentName}.module';`;

  fs.writeFileSync(componentIndexPath, componentIndexContent.trim());

  // create the module file

  const modulePath = path.resolve(apiBasePath, `${componentName}.module.ts`);

  const moduleContent = `import { Module } from '@nestjs/common';
  import { ${capitalized}Service } from './${componentName}.service';
  import { ${capitalized}Controller } from './${componentName}.controller';
  import { createMongooseFeature } from 'src/core/mongoose-utils';
  import { ${capitalized}Schemas } from './schema';
  import { StoreService } from '../store/store.service';
  import { UserService } from '../user/user.service';
  import { RoleService } from '../role/role.service';

  @Module({
    imports: [createMongooseFeature(${capitalized}Schemas)],
    controllers: [${capitalized}Controller],
    providers: [${capitalized}Service, StoreService, UserService, RoleService],
  })
  export class ${capitalized}Module {}
  `;

  fs.writeFileSync(modulePath, moduleContent.trim());

  // Create the service file

  const servicePath = path.resolve(apiBasePath, `${componentName}.service.ts`);

  const serviceContent = `import { Injectable } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { 
    I${capitalized},
    Pagination,
    TCreate${capitalized}Input,
    TFilter${capitalized}Input,
  } from '@packages/models';
  import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
  import { IService } from '../../core';
  import { ${capitalized} } from './schema/${componentName}.model';
  
  @Injectable()
  export class ${capitalized}Service implements IService<I${capitalized}, TFilter${capitalized}Input> {
    constructor(
      @InjectModel(${capitalized}.name)
      private ${capitalized}: Model<I${capitalized}>,
    ) {}

    async findOne(
      filter?: FilterQuery<I${capitalized}>,
      projection?: ProjectionType<I${capitalized}> | null,
      options?: QueryOptions<I${capitalized}> | null,
    ): Promise<I${capitalized} | null> {
      return this.${capitalized}.findOne({ ...filter, active: true }, projection, options);
    }

    async find(
      filter: FilterQuery<I${capitalized}>,
      projection?: ProjectionType<I${capitalized}> | null,
      options?: QueryOptions<I${capitalized}> | null,
    ): Promise<I${capitalized}[]> {
      return this.${capitalized}.find({ ...filter, active: true }, projection, options);
    }

    async paginate(
      data: TFilter${capitalized}Input,
      page?: number,
      perPage?: number,
    ): Promise<Pagination<I${capitalized}>> {
      throw new Error('Method not implemented.');
    }

    async updateOne(
      filter: FilterQuery<I${capitalized}>,
      data: Partial<I${capitalized}>,
      options?: QueryOptions<I${capitalized}> | null,
    ): Promise<I${capitalized} | null> {
      return this.${capitalized}.findOneAndUpdate(filter, data, options);
    }

    async create${capitalized}(data: TCreate${capitalized}Input): Promise<I${capitalized}> {
      return this.${capitalized}.create(data);
    }

    async deleteOne(filter: FilterQuery<I${capitalized}>): Promise<I${capitalized} | null> {
      return this.${capitalized}.findOneAndUpdate(filter, {
      active: false});
    }
  }
  `;

  fs.writeFileSync(servicePath, serviceContent.trim());

  // Create the controller file

  const controllerPath = path.resolve(
    apiBasePath,
    `${componentName}.controller.ts`
  );

  const controllerContent = `import { 
  create${capitalized}Input,
  filter${capitalized}Input,
  findOne${capitalized}Input,
  TCreate${capitalized}Input,
  TFilter${capitalized}Input
  } from '@packages/models';
  import { Base, Controller } from '../../core';
  import { ${capitalized}Service } from './${componentName}.service';
  import { Body, Param, Query } from '@nestjs/common';
  import { Types } from 'mongoose';
  
  @Controller({
    route: '${componentName}',
    document: '${componentName}',
  })

  export class ${capitalized}Controller {
    constructor(private readonly ${componentName}Service: ${capitalized}Service) {}
  
    @Base('POST', {
      route: '',
      zodSchema: create${capitalized}Input,
      operation: 'create',
    })
    async create(@Body() data: TCreate${capitalized}Input) {
      return this.${componentName}Service.create${capitalized}(data);
    }
    
    @Base('GET', {
      route: '',
      operation: 'read',
    })
    async find(@Query() data: TFilter${capitalized}Input) {
      return this.${componentName}Service.find(data);
    }

    @Base('GET', {
      route: ':_id',
      operation: 'read',
      zodSchema: findOne${capitalized}Input,
    })
    async findOne(@Param() _id: string) {
      return this.${componentName}Service.findOne({ _id });
    }

    @Base('PATCH', {
      operation: 'update',
      zodSchema: filter${capitalized}Input,
    })
    async updateOne(@Body() data: TFilter${capitalized}Input) {
      return this.${componentName}Service.updateOne(
        {
          _id: data!._id,
        },
        data!,
        { new: true },
      );
    }

    @Base('DELETE', {
      operation: 'delete',
      zodSchema: findOne${capitalized}Input,
    })
    async deleteOne(@Param() _id: string) {
      return this.${componentName}Service.deleteOne({ _id });
    }
  }
  `;

  fs.writeFileSync(controllerPath, controllerContent.trim());

  // update the models file in src/core/models.ts
  updateModelsFile(capitalized, componentName);

  // update the index.ts file in components
  updateIndexFile(capitalized, componentName);
}

function updateModelsFile(capitalized: string, componentName: string) {
  // update the models file in src/core/models.ts
  const modelsPath = path.resolve(__dirname, '../apps/api/src/core/models.ts');

  const newImport = `import { ${capitalized}, ${capitalized}Schema } from '../components/${componentName}/schema/${componentName}.model';
  `;
  const newModel = `  { name: ${capitalized}.name, schema: ${capitalized}Schema },
  `;

  writeInExistingFile({
    path: modelsPath,
    newImport,
    newLine: newModel,
    endImport: 'export type',
    endArray: '];',
  });
}

interface IWriteInExistingFile {
  path: string;
  newImport: string;
  newLine: string;
  endImport: string;
  endArray: string;
}

function updateIndexFile(capitalized: string, component: string) {
  const indexFilePath = path.resolve(
    __dirname,
    '../apps/api/src/components/index.ts'
  );

  const newImport = `import { ${capitalized}Module } from './${component}';

  `;
  const newModule = `${capitalized}Module,`;

  writeInExistingFile({
    path: indexFilePath,
    newImport,
    newLine: newModule,
    endImport: 'export const',
    endArray: '];',
  });
}

function writeInExistingFile({
  path,
  newImport,
  newLine,
  endImport,
  endArray,
}: IWriteInExistingFile) {
  fs.readFile(path, 'utf-8', (err, data) => {
    const importEndIndex = data.lastIndexOf(endImport);
    const updatedData =
      data.slice(0, importEndIndex - 1) +
      newImport +
      data.slice(importEndIndex);
    const arrayEndIndex = updatedData.lastIndexOf(endArray);
    const finalData =
      updatedData.slice(0, arrayEndIndex) +
      newLine +
      updatedData.slice(arrayEndIndex);
    fs.writeFileSync(path, finalData);
  });
}

// Get the component name from CLI arguments
const args = process.argv.slice(2);
console.log(process.argv);
if (args.length === 0) {
  console.error('Error: Please provide a component name.');
  process.exit(1);
}

const componentName = args[0];

// First, generate the packages folder and files
generatePackageComponent(componentName);
runPrettier('models');
// Next, generate the Api folder and files
generateApiComponent(componentName);
runPrettier('api');
