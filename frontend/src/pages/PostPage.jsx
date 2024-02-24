import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { useEffect, useState } from "react"
import Comment from "../components/Comment"
import useGetUserProfile from "../hooks/useGetUserProfile"
import useShowToast from "../hooks/useShowToast"
import { useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { DeleteIcon } from "@chakra-ui/icons"


const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [post, setPosts] = useState(null);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error")
      }
    }
    getPost();
  }, [showToast, pid])

  const handleDeletePost = async (e) => {

  }

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    )
  }
  if (!post) return null;

  return <>
    <Flex>
      <Flex w={"full"} alignItems={"center"} gap={3}>
        <Avatar src={user.profilePic} size={"md"} name="username" />
        <Flex>
          <Text fontSize={"small"} fontWeight={"bold"}>{user.username}</Text>
          <Image src="/verified.png" w={4} h={4} ml={4} />
        </Flex>
      </Flex>
      <Flex gap={4} alignItems={"center"}>
        {post?.createdAt && (
          <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
            {/* it's giving error fckn formatDistanceToNow....  */}
            {formatDistanceToNow(new Date(post?.createdAt))} ago
          </Text>
        )}
        {currentUser?._id === user?._id && (
          <DeleteIcon size={20} onClick={handleDeletePost} />
        )}
      </Flex>
    </Flex>

    <Text my={3}>{post.text}</Text>
    {post.img && (
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={post?.img} w={"full"} />
      </Box>
    )}

    <Flex gap={3} my={3}>
      <Actions post={post} />
    </Flex>

    <Divider my={4} />

    <Flex justifyContent={"space-between"}>
      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"2xl"}>👋</Text>
        <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
      </Flex>
      <Button>
        Get
      </Button>
    </Flex>

    <Divider my={4} />
    {/* <Comment
      comment="Looks really good!" createdAt="2d" likes={100} username="John doe"
      userAvatar="https://bit.ly/dan-abramov" /> */}


  </>

}

export default PostPage