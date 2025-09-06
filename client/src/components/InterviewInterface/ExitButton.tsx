import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { DoorOpen, Download, Trash2 } from 'lucide-react'

export function ExitButton() {
  const [showExitDialog, setShowExitDialog] = useState(false)

  const handleExit = () => {
    // Implement actual exit logic here
    window.location.href = '/'
  }

  return (
    <>
      <Button 
        variant="destructive" 
        size="lg"
        className="fixed bottom-4 left-4 bg-zinc-800/90 hover:bg-red-600/90"
        onClick={() => setShowExitDialog(true)}
      >
        <DoorOpen className="mr-2 h-5 w-5" />
        Exit Interview
      </Button>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Interview</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to download the recording before exiting?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleExit}>
              <Trash2 className="mr-2 h-4 w-4" />
              Exit Without Saving
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              // Implement download logic here
              handleExit()
            }}>
              <Download className="mr-2 h-4 w-4" />
              Download and Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

