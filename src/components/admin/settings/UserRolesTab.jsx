import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaPlus, FaUserPlus, FaEdit, FaTrash, FaShieldAlt, FaUserShield } from "react-icons/fa";
import InviteUserModal from "./InviteUserModal";
import RoleForm from "./RoleForm";
import ConfirmModal from "../ConfirmModal";

const UserRolesTab = () => {
  const [activeSection, setActiveSection] = useState("users"); // 'users' or 'roles'
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal & Form States
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isRoleFormOpen, setIsRoleFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all admin users (including team members) - fetch with high limit to get all
      const token = localStorage.getItem("token");
      const usersRes = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/admin/users?role=admin&limit=1000`,
        { 
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const [rolesRes, invitesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/roles`, { withCredentials: true }),
        axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/roles/invites/all`, { withCredentials: true })
      ]);

      if (usersRes.data.success) {
        // Extract users array from response - the API returns { data: { users: [], pagination: {} } }
        const usersData = usersRes.data.data?.users || [];
        // Filter to ensure we only show admin users (role='admin' or have adminRole)
        const adminUsers = usersData.filter(user => 
          user.role === 'admin' || (user.adminRole && user.adminRole !== null)
        );
        setUsers(adminUsers);
      } else {
        toast.error(usersRes.data?.message || "Failed to load admin users");
      }
      
      if (rolesRes.data.success) {
        const rolesData = rolesRes.data.data || rolesRes.data || [];
        setRoles(Array.isArray(rolesData) ? rolesData : []);
      }
      
      if (invitesRes.data.success) {
        const invitesData = invitesRes.data.data || invitesRes.data || [];
        setInvites(Array.isArray(invitesData) ? invitesData : []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditRole = (role) => {
    setEditingRole(role);
    setIsRoleFormOpen(true);
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setIsRoleFormOpen(true);
  };

  const handleCloneRole = (role) => {
    const clonedRole = {
      ...role,
      displayName: `${role.displayName} (Copy)`,
      name: `${role.name}-copy-${Date.now()}`,
      _id: undefined,
      isPreset: false
    };
    setEditingRole(clonedRole);
    setIsRoleFormOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    setRoleToDelete(roleId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roleToDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/roles/${roleToDelete}`,
        { 
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        toast.success("Role deleted successfully");
        fetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete role");
    } finally {
      setShowDeleteModal(false);
      setRoleToDelete(null);
    }
  };

  const handleRoleFormSuccess = () => {
    setIsRoleFormOpen(false);
    setEditingRole(null);
    fetchData();
  };

  if (isRoleFormOpen) {
    return (
      <RoleForm 
        role={editingRole} 
        onSuccess={handleRoleFormSuccess} 
        onCancel={() => setIsRoleFormOpen(false)} 
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex space-x-4 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveSection("users")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeSection === "users" 
                ? "bg-white text-orange-500 shadow-sm" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveSection("roles")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeSection === "roles" 
                ? "bg-white text-orange-500 shadow-sm" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Roles & Permissions
          </button>
        </div>

        {activeSection === "users" ? (
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <FaUserPlus /> Invite User
          </button>
        ) : (
          <button
            onClick={handleCreateRole}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <FaPlus /> New Role
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <>
          {/* USERS SECTION */}
          {activeSection === "users" && (
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Active Users Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-bold text-gray-800">Team Members</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                        <th className="px-6 py-3 font-semibold">User</th>
                        <th className="px-6 py-3 font-semibold">Email</th>
                        <th className="px-6 py-3 font-semibold">Role</th>
                        <th className="px-6 py-3 font-semibold">Joined</th>
                        <th className="px-6 py-3 font-semibold">Number</th>
                        <th className="px-6 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(() => {
                        const filteredUsers = users.filter(user => {
                          if (!searchQuery) return true;
                          const query = searchQuery.toLowerCase();
                          return (
                            user.name?.toLowerCase().includes(query) ||
                            user.email?.toLowerCase().includes(query)
                          );
                        });

                        return filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                  </div>
                                  <span className="font-medium text-gray-800">{user.name || "N/A"}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-600 text-sm">{user.email || "N/A"}</td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {user.adminRole || user.role || "Admin"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-gray-500 text-sm">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                }) : "N/A"}
                              </td>
                              <td className="px-6 py-4 text-gray-500 text-sm">
                                {user.phone || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-600">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                              {searchQuery ? "No users found matching your search." : "No team members found."}
                            </td>
                          </tr>
                        );
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending Invites Table */}
              {invites.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800">Pending Invitations</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                          <th className="px-6 py-3 font-semibold">Email</th>
                          <th className="px-6 py-3 font-semibold">Role</th>
                          <th className="px-6 py-3 font-semibold">Sent By</th>
                          <th className="px-6 py-3 font-semibold">Sent Date</th>
                          <th className="px-6 py-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {invites.map((invite) => (
                          <tr key={invite._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-gray-800 font-medium text-sm">{invite.email}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {invite.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-sm">
                              {invite.invitedBy?.name || "Unknown"}
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-sm">
                              {new Date(invite.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                invite.status === 'pending' ? 'bg-orange-100 text-orange-800' : 
                                invite.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ROLES SECTION */}
          {activeSection === "roles" && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Roles Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                        <th className="px-6 py-3 font-semibold">Role Name</th>
                        <th className="px-6 py-3 font-semibold">Description</th>
                        <th className="px-6 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {roles.filter(role => {
                        if (!searchQuery) return true;
                        const query = searchQuery.toLowerCase();
                        return (
                          role.displayName?.toLowerCase().includes(query) ||
                          role.name?.toLowerCase().includes(query) ||
                          role.purpose?.toLowerCase().includes(query)
                        );
                      }).map((role) => (
                        <tr key={role._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">{role.displayName || role.name}</span>
                              {role.isPreset && (
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">System</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {role.purpose || role.description || "No description"}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditRole(role)}
                                className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                title="Edit"
                              >
                                <FaEdit size={14} />
                              </button>
                              <button
                                onClick={() => handleCloneRole(role)}
                                className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                title="Clone"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              {!role.isPreset && (
                                <button
                                  onClick={() => handleDeleteRole(role._id)}
                                  className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                                  title="Delete"
                                >
                                  <FaTrash size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {roles.filter(role => {
                        if (!searchQuery) return true;
                        const query = searchQuery.toLowerCase();
                        return (
                          role.displayName?.toLowerCase().includes(query) ||
                          role.name?.toLowerCase().includes(query) ||
                          role.purpose?.toLowerCase().includes(query)
                        );
                      }).length === 0 && (
                        <tr>
                          <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                            {searchQuery ? "No roles found matching your search." : "No roles found."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Invite Modal */}
      <InviteUserModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        onInviteSuccess={fetchData}
        roles={roles}
      />

      {/* Delete Role Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setRoleToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Role"
        message="Are you sure you want to delete this role? This action cannot be undone. Users with this role will need to be reassigned."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default UserRolesTab;
