// src/lib/sync.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { RoleService } from '../components/role/role.service';

@Injectable()
export class SyncService implements OnApplicationBootstrap {
  constructor(
    private readonly roleService: RoleService, // Inject your RoleService or RoleModel here
  ) {}

  private getComponentNames(): string[] {
    const componentsPath = join(__dirname, '../components');
    return readdirSync(componentsPath).filter((file) =>
      statSync(join(componentsPath, file)).isDirectory(),
    );
  }

  private async syncDocuments() {
    const components = this.getComponentNames();
    console.log('Syncing components:', components);

    const adminRole = await this.roleService.findOne({ name: 'superadmin' });

    let roleDocuments = adminRole?.documents || [];

    const filteredOutComponents = components.filter((component) => {
      // filter out address and auth components
      return component !== 'address' && component !== 'auth';
    });

    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    for (const component of filteredOutComponents) {
      // Check if the component is already in the admin role documents

      const found = roleDocuments.find((doc) => doc.name === component);

      if (!found) {
        // If not, add it
        roleDocuments = [
          ...roleDocuments,
          { name: component, permissions: ['all'] },
        ];
      }

      // Update the role with the new documents

      await this.roleService.updateOne(
        { _id: adminRole._id },
        { documents: roleDocuments },
      );

      console.log('Component synced:', component);
    }
  }

  async onApplicationBootstrap() {
    await this.syncDocuments();
  }
}
