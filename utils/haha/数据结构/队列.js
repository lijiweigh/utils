/**
 * function Queue(){}
 * 
 * prop
 *      items []
 * 
 * method
 *      enqueue()
 *      dequeue()
 *      front()
 *      isEmpty()
 *      clear()
 *      size()  
 */

 class Queue {
     constructor () {
         this.items = []
     }

     enqueue (item) {
         this.items.push (item)
     }

     dequeue () {
         return this.items.shift()
     }

     front () {
         return this.items[0]
     }

     isEmpty () {
         return this.items.length === 0
     }

     clear () {
         this.items = []
     }

     size () {
         return this.items.length
     }
 }

 exports.Queue = Queue