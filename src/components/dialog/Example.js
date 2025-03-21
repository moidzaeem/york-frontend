import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import { Description, Field, Label, Textarea } from '@headlessui/react'
// import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

function Example() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <AnimatePresence>
        {isOpen && (
          <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg space-y-4 bg-white p-12"
              >
                <DialogTitle className="text-lg font-bold">Deactivate account</DialogTitle>
                <Description>This will permanently deactivate your account</Description>
                <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                <div className="flex gap-4">
                  <button onClick={() => setIsOpen(false)}>Cancel</button>
                  <button onClick={() => setIsOpen(false)}>Deactivate</button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

export default Example;