import { useEffect,useState } from "react";
import toast from "react-hot-toast";

export const useErrors=(errors=[])=>{
    useEffect(()=>{
        errors.forEach(({isError,error,fallback})=>{
            if(isError)
            {
                if(fallback) fallback();
                else
                toast.error(error?.data?.message || "Something went wrong")
            }
        })
    },[errors])
}

export const useAsyncMutation=(mutationHook)=>{
    const [mutate]=mutationHook();
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState(null);

    const executeMutation=async(toastMessage,...args)=>{

        const toastId=toast.success(toastMessage || "updating data...")

        try{
            const res=await mutate(...args);
            if(res.data)
            {
              toast.success(res?.data?.message || "Updated data successfully.",{id:toastId});
              setData(res?.data)
            }
            else
          {
            toast.error(res?.error?.data?.message || "Something went wrong",{id:toastId});
          }
          }
          catch(error)
          {
            console.log(error)
            toast.error(error.data.message || "Something went wrong",{id:toastId});
          }
        finally{
            setIsLoading(false)
        }
    }

    return [executeMutation,data,isLoading]
}

export const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};