import { useUser } from "@clerk/nextjs"
import { api } from "~/utils/api"
import React, { useState } from "react"
import toast from "react-hot-toast"
import AtomsAvatar from "../../atoms/avatar"
import AtomsButtonBase from "~/components/atoms/button/base"

const OrganismsPostCreate = () => {
  const { user } = useUser(); 
  const [input, setInput] = useState("")
  const ctx = api.useContext();

  // if a mutation is happening, we want to render on a different way 
  // === rerender
  const { mutate, isLoading } = api.posts.create.useMutation({
    onSuccess: async () => {
      setInput("");
      await ctx.posts.index.invalidate();
    }, 
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content 
      if(errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      }
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const onClickMutate = () => {
    mutate({content: input})
  }

  if (!user) return null;

  return (
    <div className="flex gap-4 w-full">
      { user && (
        <AtomsAvatar 
          src={user.imageUrl}
          alt="User profile avatar"
          width={40}
          height={40}
        />
      )}
      <input 
        placeholder="What is happening?" 
        className="grow bg-transparent" 
        value={input}
        onChange={handleChange}
        disabled={isLoading}
      />
      <AtomsButtonBase 
        onClick={onClickMutate}
        className='px-5 py-0.5 bg-sky-500 hover:bg-sky-600'
      >
        Post
      </AtomsButtonBase>
    </div>
  )
}

export default OrganismsPostCreate


// メモ
// w-100 → w-full

// EventForm リスト、、！
// https://zenn.dev/kenta0313/articles/a39fb1d8edc3a4