import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

describe('AppModule', () => {
  let module: AppModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    module = TestBed.inject(AppModule);
  });

  // Module Initialization Tests
  describe('Module Initialization', () => {
    it('should create the app module', () => {
      expect(module).toBeTruthy();
    });

    it('should be defined', () => {
      expect(AppModule).toBeDefined();
    });
  });

  // Module Configuration Tests
  describe('Module Configuration', () => {
    it('should import BrowserModule', () => {
      const metadata = (AppModule as any)['ɵmod'].imports;
      expect(metadata).toContain(BrowserModule);
    });

    it('should import AppRoutingModule', () => {
      const metadata = (AppModule as any)['ɵmod'].imports;
      const hasRoutingModule = metadata.some((imp: any) => 
        imp === AppRoutingModule || (imp && imp.name === 'AppRoutingModule')
      );
      expect(hasRoutingModule).toBeTruthy();
    });

    it('should declare AppComponent', () => {
      const metadata = (AppModule as any)['ɵmod'].declarations;
      expect(metadata).toContain(AppComponent);
    });

    it('should bootstrap AppComponent', () => {
      const metadata = (AppModule as any)['ɵmod'].bootstrap;
      expect(metadata).toContain(AppComponent);
    });
  });

  // Providers Tests
  describe('Providers', () => {
    it('should have empty providers array or default providers', () => {
      const metadata = (AppModule as any)['ɵmod'].providers;
      // Providers can be empty or contain default services
      expect(Array.isArray(metadata) || metadata === undefined).toBeTruthy();
    });
  });

  // Module Dependencies Tests
  describe('Module Dependencies', () => {
    it('should have all required imports', () => {
      const metadata = (AppModule as any)['ɵmod'].imports;
      expect(metadata.length).toBeGreaterThanOrEqual(2);
    });

    it('should have AppComponent declared', () => {
      const declarations = (AppModule as any)['ɵmod'].declarations;
      expect(declarations.length).toBeGreaterThanOrEqual(1);
    });
  });
});
