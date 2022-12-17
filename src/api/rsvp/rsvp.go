package rsvp

type Person struct {
	Name            string   `json:"name,omitempty"`
	EMail           string   `json:"email,omitempty"`
	InvitedToBrunch bool     `json:"brunch,omitempty"`
	GroupMembers    []string `json:"groupMembers,omitempty"`
	Titling         string   `json:"titling,omitempty"`
	Family          string   `json:"family,omitempty"`

	// rsvp fields
	Attending       string `json:"attendingEvent,omitempty"`
	AttendingBrunch string `json:"attendingBrunch,omitempty"`
	Entree          string `json:"entree,omitempty"`
	Restrictions    string `json:"restrictions,omitempty"`
	Covid           string `json:"covid,omitempty"`
}
