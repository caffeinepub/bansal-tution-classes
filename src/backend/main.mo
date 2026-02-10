import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type Lesson = {
    subject : Text;
    dayOfWeek : Text;
    startTime : Time.Time;
    endTime : Time.Time;
    teacher : Text;
    classroom : Text;
  };

  public type SchoolTimetable = {
    lessons : [Lesson];
  };

  public type PaymentSettings = {
    paymentId : Text;
    paymentProviderUrl : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let timetable = Map.empty<Text, Lesson>();

  var paymentSettings : PaymentSettings = {
    paymentId = "DE1234567ICPEURPAYCORE"; // dummy id
    paymentProviderUrl = "https://www.stoicwallet.com"; // dummy provider
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Timetable Management
  public shared ({ caller }) func setTimetable(lt : [Lesson]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can set the timetable");
    };

    timetable.clear();
    for (lesson in lt.values()) {
      timetable.add(Text.fromArray(lesson.dayOfWeek.toArray().concat(lesson.subject.toArray())), lesson);
    };
  };

  public query ({ caller }) func getTimetable() : async [Lesson] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view the timetable");
    };
    timetable.values().toArray();
  };

  public shared ({ caller }) func addLesson(lesson : Lesson) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add lessons");
    };

    timetable.add(Text.fromArray(lesson.dayOfWeek.toArray().concat(lesson.subject.toArray())), lesson);
  };

  public shared ({ caller }) func updateLesson(lesson : Lesson) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update lessons");
    };

    timetable.add(Text.fromArray(lesson.dayOfWeek.toArray().concat(lesson.subject.toArray())), lesson);
  };

  public shared ({ caller }) func removeLesson(dayOfWeek : Text, subject : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can remove lessons");
    };

    timetable.remove(Text.fromArray(dayOfWeek.toArray().concat(subject.toArray())));
  };

  // Payment Settings Management
  public shared ({ caller }) func setPaymentSettings(settings : PaymentSettings) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update payment settings");
    };

    paymentSettings := settings;
  };

  public query ({ caller }) func getPaymentSettings() : async PaymentSettings {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view payment settings");
    };
    paymentSettings;
  };
};
