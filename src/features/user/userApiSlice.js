import { apiSlice } from "../api/apiSlice";

const baseUrl = process.env.REACT_APP_API_URL_A;
const baseDomainCode = process.env.REACT_APP_BASE_DOMAIN_CODE;

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getUserInfo: builder.query({
        query: () => {
          return `${process.env.REACT_APP_API_URL_A}/users/user-detail?domain=${baseDomainCode}`;
          // return `http://localhost:2626/user/62fdeaa127aab641c9b3c0fa`;
        },
      }),
      getListUser: builder.query({
        query: (params) => {
          let urlQuery = `${process.env.REACT_APP_API_URL_A}/users?`;
          if(params) {
            Object.entries(params).forEach(([key, value], index) => {
              if(index === Object.keys(params).length - 1) {
                urlQuery += `${key}=${value}`;
              } else {
                urlQuery += `${key}=${value}&`;
              }
            });
          }
          return urlQuery;
        },
        providesTags: (result, error, arg) => {
          if (result?.data?.data?.length > 0) {
            return [
              { type: "User", id: "LIST" },
              ...result.data.data.map((item) => ({ type: "User", id: item.id })),
            ];
          } else return [{ type: "User", id: "LIST" }];
        },
      }),
      getListUserByIds: builder.query({
        query: (params) => {
          return `${process.env.REACT_APP_API_URL_A}/users/find-user?ids=${params.join(",")}`
        }
      }),
      addNewUser: builder.mutation({
        query: (payload) => ({
          url: `${baseUrl}/users`,
          method: "POST",
          body: JSON.stringify(payload),
        }),
        invalidatesTags: [
          {
            type: "User",
            id: "LIST",
          },
        ],
      }),
      updateUser: builder.mutation({
        query: ({id, ...payload}) => ({
          url: `${baseUrl}/users/${id}`,
          method: "PUT",
          body: JSON.stringify(payload),
        }),
        invalidatesTags: (result, error, arg) => [
          {
            type: "User",
            id: arg.id,
          },
        ],
      }),
      deleteUser: builder.mutation({
        query: ({ id }) => ({
          url: `${baseUrl}/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [
          {
            type: "User",
            id: arg.id,
          },
        ],
      }),
      assignRole: builder.mutation({
        query: ({ ids, isAssign, role }) => ({
          url: `${baseUrl}/users/assign-role?ids=${ids}&assign=${isAssign}&role=${role}`,
          method: "PUT",
        }),
        invalidatesTags: [
          {
            type: "User",
            id: "LIST",
          },
        ],
      }),
      changeUserPassword: builder.mutation({
        query: ({ username, ...payload }) => ({
          url: `${baseUrl}/users/${username}/change-password`,
          method: "PUT",
          body: JSON.stringify(payload),
        }),
      })
    }),
  });

export const {
    useLazyGetUserInfoQuery,
    useGetListUserQuery,
    useLazyGetListUserQuery,
    useLazyGetListUserByIdsQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useAssignRoleMutation,
    useChangeUserPasswordMutation,
  } = usersApiSlice;