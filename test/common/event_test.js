/* global cohesive */
describe('cohesive.event', function() {

  describe('EventTarget', function() {
    var EventTarget = cohesive.event.EventTarget,
        Event       = cohesive.event.Event

    it('should listen to simple event', function() {
      var target = new EventTarget(), count = 0

      var f = function(e) {
        count++
        assert.equal(e.type, 'test')
      }
      assert.equal(target.listen('test', f), target)

      assert.equal(count, 0)
      assert.equal(target.dispatchEvent('test'), true)
      assert.equal(target.dispatchEvent('test'), true)
      assert.equal(count, 2)

      target.unlisten('test', f)
      assert.equal(target.dispatchEvent('test'), true)
      assert.equal(count, 2)
    })

    it('should listen to multiple simple events', function() {
      var target = new EventTarget(), count = 0

      var f = function(e) {
        count++
//        assert.equal(e.type, 'test1')
      }
      assert.equal(target.listen(['test1', 'test2'], f), target)

      assert.equal(count, 0)
      assert.equal(target.dispatchEvent('test1'), true)
      assert.equal(target.dispatchEvent('test2'), true)
      assert.equal(count, 2)

      assert.equal(target.unlisten(['test2', 'test3'], f), target)
      assert.equal(target.dispatchEvent('test2'), true)
      assert.equal(count, 2)
    })

    it('should listen to object event', function() {
      var target = new EventTarget(), count = 0, dummy = {}

      var f = function(e) {
        count++
        assert.equal(e.type, 'test')
      }
      target.listen('test', f)

      assert.equal(count, 0)
      target.dispatchEvent({type:'test'})
      assert.equal(count, 1)

      target.dispatchEvent(new Event('test'))
      assert.equal(count, 2)
      target.removeAllListeners('test')
      target.dispatchEvent('test')
      assert.equal(count, 2)
    })
  })
})
