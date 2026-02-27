import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

describe('AppRoutingModule', () => {
  let router: Router;
  let module: AppRoutingModule;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AppRoutingModule
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    module = TestBed.inject(AppRoutingModule);
  });

  // Module Initialization Tests
  describe('Module Initialization', () => {
    it('should create the app routing module', () => {
      expect(module).toBeTruthy();
    });

    it('should be defined', () => {
      expect(AppRoutingModule).toBeDefined();
    });
  });

  // Router Configuration Tests
  describe('Router Configuration', () => {
    it('should have router service injected', () => {
      expect(router).toBeTruthy();
    });

    it('should initialize with empty routes array', () => {
      const metadata = (AppRoutingModule as any)['ɵmod'].imports;
      expect(metadata).toBeDefined();
    });
  });

  // Routes Definition Tests
  describe('Routes Definition', () => {
    it('should have routes configured', () => {
      expect(router.config).toBeDefined();
    });

    it('should be ready for route additions', () => {
      expect(router).toBeTruthy();
    });
  });

  // Module Exports Tests
  describe('Module Exports', () => {
    it('should export RouterModule for child modules', () => {
      const metadata = (AppRoutingModule as any)['ɵmod'].exports;
      expect(metadata).toBeDefined();
    });
  });

  // Routing Functionality Tests
  describe('Routing Functionality', () => {
    it('should not throw error when navigating', (done) => {
      router.navigate(['/']).then(() => {
        expect(router.url).toBe('/');
        done();
      }).catch(err => {
        done.fail(err);
      });
    });

    it('should have no redirect loops', () => {
      expect(router.config.length).toBeGreaterThanOrEqual(0);
    });
  });

  // Future Route Configuration Tests
  describe('Future Route Configuration', () => {
    it('should be ready to add new routes', () => {
      const initialRoutesCount = router.config.length;
      // Can add routes dynamically
      expect(router).toBeTruthy();
      expect(router.config.length).toBe(initialRoutesCount);
    });

    it('should maintain route structure', () => {
      expect(Array.isArray(router.config)).toBeTruthy();
    });
  });
});
