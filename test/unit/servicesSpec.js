'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('bookItApp'));

  // Test service availability
  it('check the existence of Product factory', inject(function(Product) {
      expect(Product).toBeDefined();
    }));
});